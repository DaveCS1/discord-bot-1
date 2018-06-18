exports.run = async (client, msg, args, lang) => {
	const tableload = client.guildconfs.get(msg.guild.id);
	let addedrole = args.slice().join(' ');
	const foundRole = msg.guild.roles.find(role => role.name.toLowerCase() === args.slice().join(' ').toLowerCase());
	const author = msg.guild.members.get(msg.author.id);
	const channelID = msg.channel.id;

	if (addedrole.length < 1) return msg.reply(lang.join_noinput).then(m => m.delete(10000));
	if (!foundRole) return msg.reply(lang.join_rolenotexist).then(m => m.delete(10000));
	if (msg.member.roles.has(foundRole.id)) return msg.reply(lang.join_alreadyhave);

	for (var i = 0; i < tableload.selfassignableroles.length; i++) {
		if (foundRole.id === tableload.selfassignableroles[i]) {
			try {
				return author.addRole(foundRole).then(m => m.guild.channels.get(channelID).send(lang.join_roleassigned));
			} catch (error) {
				return msg.channel.send(lang.join_nopermission);
			}
		}
	}
	return msg.reply(lang.join_notwhitelisted);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],

	

	userpermissions: [], dashboardsettings: true

};
exports.help = {
	name: 'join',
	description: 'Join a self-assignable role',
	usage: 'join {rolename}',
	example: ['join Member'],
	category: 'utility',
	botpermissions: ['SEND_MESSAGES', 'MANAGE_ROLES']
};