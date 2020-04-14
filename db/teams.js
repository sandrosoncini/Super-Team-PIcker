


 module.exports = (members, method, quantity) => {
    teams = {}
    if (method === "teamCount") {
        
        let teamMix = members.split(",").filter(Boolean);
        
        for (let i = 1; i <= quantity; i++) {
            teams[i] = [];
        }
        while (teamMix.length !== 0) {
            for (let team in teams) {
                teams[team].push(teamMix.splice(Math.floor(Math.random() * teamMix.length), 1)[0].toUpperCase());
                if (teamMix.length === 0) break;
            }
        }
        return teams;
    }
    if (method === "numberTeam") {
        let teamMix = members.split(",").filter(Boolean);
 
        for (let i = 1; i <= Math.ceil(teamMix.length / quantity); i++) {
            teams[i] = [];
        }
        while (teamMix.length !== 0) {
            for (let team in teams) {
                teams[team].push(teamMix.splice(Math.floor(Math.random() * teamMix.length), 1)[0]);
                if (teamMix.length === 0) break;
            }
        }
        return teams;
    }
}

