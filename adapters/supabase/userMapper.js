// src/adapters/supabase/userMapper.js

/**
 * Convertit une ligne Supabase `users` en objet `Account` pour le domaine.
 * @param  {{id, first_name, second_name, ...}} raw
 * @returns {{ id, firstName, lastName, records }}
 */
export function mapUserRowToAccount(raw) {
  return {
    id:        raw.id,
    firstName: raw.first_name,
    lastName:  raw.second_name,
    // on initialise un container de scores vide, sera rempli plus tard
    records:   {}
  };
}
