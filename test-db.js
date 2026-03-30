const { Pool } = require('pg');

const pool = new Pool({
  host: 'db.ruumzjpycazxgciejwhs.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Camille-Eliot-2002',
  ssl: { rejectUnauthorized: false },
});

pool.query('SELECT count(*) as clubs FROM "Club"')
  .then(r => {
    console.log('CONNEXION OK - Clubs:', r.rows[0].clubs);
    return pool.end();
  })
  .catch(e => {
    console.error('ERREUR:', e.message);
    process.exit(1);
  });
