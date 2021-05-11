module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) throw new Error(err)
    
    const [ userID, guildID = d.message.guild.id] = inside.splits
    
    const guild = d.client.guilds.cache.get(guildID) 
    
    if (!guild) throw new Error(`❌ Invalid guild ID in \`$memberExists${inside}\``) 
    
    const member = await guild.members.fetch(userID || "none").catch(err => null)
    
    return {
        code: code.replaceLast(`$memberExists${inside}`, Boolean(member)) 
    }
}