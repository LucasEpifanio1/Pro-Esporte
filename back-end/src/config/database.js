module.exports = {
  dialect: 'postgres',
  host: 'ep-rough-glitter-ad6ve1cl-pooler.c-2.us-east-1.aws.neon.tech',
  username: 'neondb_owner', 
  password: 'npg_q7WTl8aCzJKr', 
  database: 'banco',
  define: {
    timestamps: true,
    underscored: true, 
  },
  dialectOptions: {
    ssl: { require: true }, 
  },
};


//parametros para conexão do banco
//PGHOST='ep-rough-glitter-ad6ve1cl-pooler.c-2.us-east-1.aws.neon.tech'
//PGDATABASE='neondb'
///PGUSER='neondb_owner'
//PGPASSWORD='npg_q7WTl8aCzJKr'
//PGSSLMODE='require'
//PGCHANNELBINDING='require'