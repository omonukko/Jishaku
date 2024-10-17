# Jishaku
Jishaku for discord.js-selfbot-v13 or discord.js

# Install

```
npm install @omoti/jsk
```

# Package Use Example

```typescript
import {Jishaku} from '@omoti/jsk';

export let jsk: Jishaku;
jsk = new Jishaku(client, {
  useableUserId: ["userid1", "userid2"], // Your Discord UserID
  allowMultiShRunning: false, // Multi Shell Running Allow?
  prefix: "custom prefix", // Bot Prefix
  encoding: "utf-8", // utf-8 
});

client.on("messageCreate", async (message: Message) => {
  await jsk.onMessageCreated(message);
});
```

support:Issue
