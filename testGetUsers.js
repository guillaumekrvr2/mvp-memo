// testGetUsers.js
import { SupabaseUserRepository } from './data/supabase/supabaseUserRepository.js';
import { GetUsers } from './usecases/GetUsers.js';

async function run() {
  const repo = new SupabaseUserRepository();
  const getUsers = new GetUsers(repo);

  try {
    const list = await getUsers.execute({
      mode: 'memory-league',
      discipline: 'numbers',
    });
    console.log('Nombre de comptes récupérés :', list.length);
    console.log(list[0].getFullName()); // devrait afficher le nom du premier user
  } catch (err) {
    console.error('Erreur lors de GetUsers :', err.message);
  }
}

run();
