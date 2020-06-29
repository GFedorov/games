const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const RESULT_WIN = 1;
const RESULT_LOSE = 2;
const RESULT_DRAW = 3;
const StepSchema = new Schema({
    scene: [String],
    player: String,
    result: Number,
    game_id: String,
    time: {type:Date, default:Date.now}
  
});
const Step = mongoose.model('Step', StepSchema);

const create = async (fields) => {
    const step = new Step(fields);
    await step.save();
    return step;
}

module.exports = {
    create,
    RESULT_WIN,
    RESULT_LOSE,
    RESULT_DRAW
}