use actix_web::web;

mod auth;
mod echo;
mod health;
mod user;
mod csv;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(health::health)
            .service(echo::echo)
            .service(user::get)
            .service(user::pass)
            .service(user::put)
            .service(csv::transactions_to_csv)
            .configure(auth::configure),
    );
}
