import Slack from "@slack/bolt";

import { prisma } from "../util/prisma.js";

export async function handle_cmd_get_old(app: Slack.App) {
    app.command('/get-old-nest', async ({ command, ack, say  }) => {
        ack()
        if (command.channel !== "C05VBD1B7V4") {
            return say({ text: `This command is not supported in this channel. Please use it in <#C05VBD1B7V4>`  })
        }
         const users = await prisma.users.findMany({
              where: {
                is_approved: null,
              },
         });
        say({
            text: `There are currently ${users.length} users who have not been approved yet. Here are them but listed:\n@${users.map((u:any)=>u.slack_user_id).join('\n@')}`,
            response_type: 'ephemeral'
        })
    })
}