/*
 * @Author: stupid cat
 * @Date: 2017-05-07 18:50:03
 * @Last Modified by: stupid cat
 * @Last Modified time: 2017-05-07 18:50:03
 *
 * This project uses the AGPLv3 license. Please read the license file before using/adapting any of the code.
 */

const Builder = require('../structures/TagBuilder');

module.exports =
    Builder.APITag('messageembeds')
        .withArgs(a => a.optional([a.optional('channel'), a.require('messageid')]))
        .withDesc('Returns the array of embeds on the given message in the given channel.' +
            '\n`channel` defaults to the current channel' +
            '\n`messageid` defaults to the executing message id')
        .withExample(
            'You sent an embed that looked like "{messageembed}"',
            'You sent an embed that looked like "[{"title":"Hello!"}]"'
        )
        .whenArgs(0, async (_, context) => JSON.stringify(context.msg.embeds))
        .whenArgs(1, async function (subtag, context, args) {
            let message = await bu.getMessage(context.channel.id, args[0]);

            if (message != null)
                return JSON.stringify(message.embeds);
            return Builder.errors.noMessageFound(subtag, context);
        })
        .whenArgs(2, async function (subtag, context, args) {
            let channel = Builder.util.parseChannel(context, args[0]);
            if (typeof channel == "function")
                return channel(subtag, context);

            let message = await bu.getMessage(channel.id, args[1]);

            if (message != null)
                return JSON.stringify(message.embeds);
            return Builder.errors.noMessageFound(subtag, context);
        })
        .whenDefault(Builder.errors.tooManyArguments)
        .build();