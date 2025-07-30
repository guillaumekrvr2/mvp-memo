La fonction public.handle_new_user() que vous avez définie (et reliée au trigger on_auth_user_created sur auth.users) fait exactement les opérations suivantes à chaque fois qu’un nouvel enregistrement est inséré dans auth.users :

Sécurité et contexte d’exécution

Elle est déclarée avec SECURITY DEFINER, c’est‑à‑dire qu’elle s’exécute avec les droits de son propriétaire (typiquement un rôle admin/postgres), et non avec ceux de l’appelant (le rôle anon de GoTrue).

À l’intérieur, on verrouille explicitement le search_path pour s’assurer que tous les objets (tables, fonctions) sont recherchés dans public en priorité, puis dans pg_catalog.

Désactivation temporaire de RLS

Juste après, on exécute PERFORM set_config('row_security', 'off', true);

Cette commande désactive l’application des policies Row Level Security pendant l’exécution de la fonction, ce qui permet à la même fonction d’ignorer les règles RLS de public.users et d’y écrire malgré tout.

Insertion dans la table métier

La fonction fait un

sql
Copier
Modifier
INSERT INTO public.users (id, email, created_at)
  VALUES (NEW.id, NEW.email, now())
ON CONFLICT (id) DO NOTHING;
Elle prend l’id et l’email du nouvel utilisateur (le pseudo‑record NEW fourni par le trigger) et crée une ligne dans votre table public.users avec un horodatage created_at = now().

Le ON CONFLICT (id) DO NOTHING garantit qu’en cas de doublon (profil déjà créé) la commande ne lèvera pas d’erreur.

Retour au flux Auth

Enfin la fonction renvoie RETURN NEW;, ce qui permet à l’insertion originale dans auth.users de se terminer normalement, avec le trigger “transparent” du point de vue de GoTrue.

👉 En résumé, dès qu’un signup aboutit dans la table des authentifications (auth.users), ce trigger appelle la fonction qui désactive RLS pour elle-même, puis crée automatiquement la ligne correspondante dans votre table métier public.users, sans jamais imposer au client React de faire cet insert.