const voiceStateOptions = require("../../utils/voiceStateOptions") 

module.exports = async d => {
 const code = d.command.code 
 
 const inside = d.unpack()
 const err  = d.inside(inside)

 if (err) throw new Error(err)
 
 const option = Object.keys(voiceStateOptions).find(opt => opt === inside.inside) 
 
 if (!option) throw new Error(`❌ Invalid option in \`$oldState${inside}\``) 
 
 const executor = voiceStateOptions[option].split(";").slice(1).join(";")
 
 return {
 code: code.replaceLast(`$oldState${inside}`, d.data.old_state ? eval(`d.data.old_state${executor}`) : "")
 }
}