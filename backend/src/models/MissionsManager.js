const AbstractManager = require("./AbstractManager");
const MissionStates = require("../JSON/MissionStates.json");

class MissionsManager extends AbstractManager {
  static table = "missions";

  findAllWithAssociation() {
    return this.connection.query(
      `SELECT m.*, a.nom FROM ${MissionsManager.table} AS m INNER JOIN associations AS a ON m.associations_id = a.id`
    );
  }

  updateEtat(mission, isValidated) {
    if (isValidated) {
      return this.connection.query(
        `update ${MissionsManager.table} set etat = ? where id = ?`,
        [MissionStates[1], mission]
      );
    }
    return this.connection.query(
      `update ${MissionsManager.table} set etat = ? where id = ?`,
      [MissionStates[2], mission]
    );
  }

  findValidatedMissions() {
    return this.connection.query(
      'SELECT m.*, a.nom FROM MISSIONS AS m INNER JOIN associations AS a ON m.associations_id = a.id WHERE m.etat = ("Validé")'
    );
  }

  findMyMissions(user) {
    return this.connection.query(
      `SELECT a.*, m.*, asso.nom AS 'nom_asso' FROM ${this.table} AS m INNER JOIN accepte AS a ON a.missions_id = m.id INNER JOIN associations AS asso ON m.associations_id = asso.id WHERE a.intervenants_id = '${user}' ORDER BY m.date_debut`
    );
  }
}

module.exports = MissionsManager;
