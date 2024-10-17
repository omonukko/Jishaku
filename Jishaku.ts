"use strict";

import * as child_process from "child_process";
import { Client as selfClient, Message as selfMessage } from "discord.js-selfbot-v13";
import { Client, Message } from "discord.js";

let isShRunning = false;

class Logger {
    funcName: string;

    constructor(funcName: string = "default") {
        this.funcName = funcName;
    }

    info(...message: any[]): void {
        console.info([`Jishaku.ts: ${this.funcName} (INFO)`], ...message);
    }

    error(...message: any[]): void {
        console.error([`Jishaku.ts: ${this.funcName} (ERROR)`], ...message);
    }
}

interface JishakuConfig {
    useableUserId:string[];
    allowMultiShRunning: boolean;
    prefix:string;
    encoding: string;
}

class Jishaku {
    client: Client | selfClient;
    config: JishakuConfig;

    constructor(client: Client, config: JishakuConfig) {
        this.client = client;
        this.config = config;

        const logger = new Logger("init");
        logger.info("=====Jishaku.ts=====\n", "Initialization of Jishaku.ts is complete!\n", "=====Jishaku.ts=====");
    }

    async onMessageCreated(message: Message | selfMessage): Promise<void> {
        let isMessageSended = false;
        let currentContent = "";
        let createdMessage: any = {};

        if (!this.config.useableUserId.includes(message.author.id)) return;
        if (!message.content.startsWith(this.config.prefix+"jsk")) return;

        if (message.content.startsWith(this.config.prefix+"jsk sh ")) {
            if (isShRunning && !this.config.allowMultiShRunning) {
                message.reply("You are trying to run multiple sh processes, but cannot because the allowMultiShRunning option is disabled.\nAlso, use of the allowMultiShRunning option is deprecated.");
            }

            const command = message.content.replace(this.config.prefix+"jsk sh ", "");
            const spawnProcess: child_process.ChildProcess = child_process.spawn("cmd", ["/c", command]);

            isShRunning = true;

            spawnProcess.stdout?.on("data", (data: Buffer) => {
                currentContent += data.toString("utf-8");
            });

            const logger = new Logger("shell");
            const timeout = setInterval(async () => {
                try {
                    if (isMessageSended) {
                        if (createdMessage) {
                            await createdMessage.edit(`\n\`\`\`Command: ${command} \n\n${currentContent.length > 1900
                                ? currentContent.slice(currentContent.length - 1900)
                                : currentContent}\`\`\``);
                        } else {
                            createdMessage = await message.reply(`\n\`\`\`Command: ${command} \n\n${currentContent.length > 1900
                                ? currentContent.slice(currentContent.length - 1900)
                                : currentContent}\`\`\``);
                        }
                    } else {
                        isMessageSended = true;
                        createdMessage = await message.reply(`\n\`\`\`Command: ${command} \n\n${currentContent.length > 1900
                            ? currentContent.slice(currentContent.length - 1900)
                            : currentContent}\`\`\``);
                    }
                } catch (error) {
                    logger.error("An error has occurred.", error);
                }
            }, 2000);

            spawnProcess.on("close", async () => {
                isShRunning = false;

                try {
                    if (isMessageSended) {
                        if (createdMessage) {
                            await createdMessage.edit(`\n\`\`\`Command: ${command} \n\n${currentContent.length > 1900
                                ? currentContent.slice(currentContent.length - 1900)
                                : currentContent}\`\`\``);
                        } else {
                            createdMessage = await message.reply(`\n\`\`\`Command: ${command} \n\n${currentContent.length > 1900
                                ? currentContent.slice(currentContent.length - 1900)
                                : currentContent}\`\`\``);
                        }
                    } else {
                        isMessageSended = true;
                        createdMessage = await message.reply(`\n\`\`\`Command: ${command} \n\n${currentContent.length > 1900
                            ? currentContent.slice(currentContent.length - 1900)
                            : currentContent}\`\`\``);
                    }
                } catch (error) {
                    logger.error("An error has occurred.", error);
                }

                const tempLogMsgId = createdMessage.id;
                createdMessage.react("✅");

                clearInterval(timeout);
                isMessageSended = false;
                createdMessage = {};
            });
        } else if (message.content.startsWith(this.config.prefix+"jsk js ")) {
            const logger = new Logger("javascript");
            let command = message.content.replace(this.config.prefix+"jsk js ", "");

            const codeBlockRegex = /^```(?:js)?\n([\s\S]*?)\n```$/;
            const codeMatch = command.match(codeBlockRegex);
            if (codeMatch) {
                command = codeMatch[1]; 
            }
            await message.react('🔄')                
            if (command.includes('child_process') || command.includes("fs") || command.includes("path")) {
                await message.reply({ content: "[the command contains restricted characters.]" });
                await message.react('❌');
                return;
            } 
            if (command.includes('client.ws.client.token') || command.includes('token')) {
                await message.reply({ content: "[token anonymous]" });
                await message.react('❌')
                return;
            }
            try {
                const result = await eval(`(async () => { ${command} })()`);
                await message.react('✅')
                const resultString = String(result);

                if (resultString.includes(this.client.ws.client.token!) || resultString.includes('child_process') || resultString.includes("fs") || resultString.includes("path")) {
                    await message.reply({ content: "[token anonymous]" });
                    await message.react('❌');
                    return;
                } else {
                    await message.reply("```\n" + resultString + "\n```");
                }
            } catch (error: any) {
                const errortostring = new Error(error).stack!;
                logger.error(errortostring)
                await message.react('❌')
                await message.reply("```js\n" + errortostring + "\n```");
            }
        }else if (message.content.startsWith(this.config.prefix+"jsk shutdown")) {
            const logger = new Logger("shutdown");
            await message.reply("Goodbye👋");
            this.client.destroy();
            process.exit(0);
        }else if (message.content.startsWith(this.config.prefix+"jsk help")) {
            await message.reply({content:`\`\`\`\nsh:[Use: .jsk sh <shell command>]\njs:[Use: .jsk js <javascript code>]\nshutdown:[Use: .jsk shutdown <arguments is none>]\`\`\``})
        }
    }
}

export { Jishaku };
