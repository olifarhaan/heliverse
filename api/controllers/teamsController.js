import Team from "../models/teamModel.js";

export const createTeamController = async (req, res, next) => {
  try {
    const { name, description, members } = req.body;

    // Create a new team
    const team = new Team({
      name,
      description,
      members
    });

    // Save the team to the database
    await team.save();

    res.status(201).jsonResponse(true, 'Team created successfully', team);
  } catch (err) {
    next(err);
  }
};


export const getTeamsController = async (req, res, next) => {
  try {
    // Retrieve all teams
    const teams = await Team.find();
    res.status(200).jsonResponse(true, 'Teams retrieved successfully', teams);
  } catch (err) {
    next(err);
  }
};
