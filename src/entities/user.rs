use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "users")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: Uuid,

    pub mail: String,
    pub name: String,
    pub password_hash: String,

    pub role: Role,
    pub state: State,

    pub siren: Option<String>,

    pub created_at: i64,
    pub siren: Option<i16>,
}

#[derive(Clone, Debug, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Integer")]
pub enum Role {
    #[sea_orm(string_value = "admin")]
    Admin,

    #[sea_orm(string_value = "partner")]
    Partner,

    #[sea_orm(string_value = "manant")]
    Manant,
}

#[derive(Clone, Debug, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Integer")]
pub enum State {
    #[sea_orm(string_value = "active")]
    Active,

    #[sea_orm(string_value = "suspended")]
    Suspended,

    #[sea_orm(string_value = "waiting_activation")]
    WaitingActivation,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}

impl From<Model> for crate::models::User {
    fn from(model: Model) -> Self {
        Self {
            id: model.id,
            mail: model.mail,
            name: model.name,
            password_hash: model.password_hash,
            role: model.role.into(),
            state: model.state.into(),
            siren: model.siren,
            created_at: model.created_at as u64,
            siren: model.siren,
        }
    }
}

impl From<crate::models::User> for Model {
    fn from(user: crate::models::User) -> Self {
        Self {
            id: user.id,
            mail: user.mail,
            name: user.name,
            password_hash: user.password_hash,
            role: user.role.into(),
            state: user.state.into(),
            siren: user.siren,
            created_at: user.created_at as i64,
            siren: user.siren,
        }
    }
}

impl From<crate::models::Role> for Role {
    fn from(role: crate::models::Role) -> Self {
        match role {
            crate::models::Role::Admin => Self::Admin,
            crate::models::Role::Partner => Self::Partner,
            crate::models::Role::Manant => Self::Manant,
        }
    }
}

impl From<Role> for crate::models::Role {
    fn from(role: Role) -> Self {
        match role {
            Role::Admin => Self::Admin,
            Role::Partner => Self::Partner,
            Role::Manant => Self::Manant,
        }
    }
}

impl From<crate::models::State> for State {
    fn from(role: crate::models::State) -> Self {
        match role {
            crate::models::State::Active => Self::Active,
            crate::models::State::Suspended => Self::Suspended,
            crate::models::State::WaitingActivation => Self::WaitingActivation,
        }
    }
}

impl From<State> for crate::models::State {
    fn from(role: State) -> Self {
        match role {
            State::Active => Self::Active,
            State::Suspended => Self::Suspended,
            State::WaitingActivation => Self::WaitingActivation,
        }
    }
}
