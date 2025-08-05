// adapters/supabase/userMapper.js

/**
 * Convertit une ligne Supabase `users` en objet `Account` pour le domaine.
 * @param  {{id, first_name, last_name, email, ...}} raw
 * @returns {{ id, firstName, lastName, email, records }}
 */
export function mapUserRowToAccount(raw) {
  // 1. Log de l'objet brut reçu de Supabase

  const account = {
    id:        raw.id,
    firstName: raw.first_name,
    lastName:  raw.last_name,   // ou raw.second_name si c'est bien le champ dans ta BDD
    email:     raw.email,
    records:   {},              // sera rempli plus tard
  };

  // 2. Log de l'objet transformé

  return account;
}
