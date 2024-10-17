# Jishaku
Jishaku for discord.js-selfbot-v13 or discord.js
[NPM](https://www.npmjs.com/package/@omoti/jsk)

# Install

```
npm install @omoti/jsk
```

# Package Use Example

```typescript
import {Jishaku} from '@omoti/jsk';

export const jsk = new Jishaku(client, {
  useableUserId: ["userid1", "userid2"], // Your Discord UserID
  allowMultiShRunning: false, // Multi Shell Running Allow?
  prefix: "custom prefix", // Bot Prefix Default:[!]
  encoding: "utf-8", // utf-8 
});

client.on("messageCreate", async (message: Message) => {
  await jsk.onMessageCreated(message);
});
```

Commands:

```
StartWith:Your Prefix
// In this example, we will use the default prefix.

sh = !jsk sh <ShellCommand>

js = !jsk js <MarkDown Code or code>

shutdown = !jsk shutdown 

help = !jsk help

```
support:Issue
