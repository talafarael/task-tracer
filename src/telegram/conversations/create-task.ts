import { CreateTask } from "../../models/task.model";
import { createTaskService } from "../../services/task.service";
import { i18n } from "../bot";
import {
  handlerGetCallbackQueryMessage,
  handlerGetTextMessage,
} from "../helpers/conversation";
import { editMessage, sendReply } from "../helpers/messages";
import { regularChooseKeyboard } from "../key-board/create-task-keyboard";
import { BotContext } from "../type/context";
import { MyConversation } from "../type/conversation";
import { formatTaskSchedule } from "../utils/formater-scheduled";
import { scheduledTimesConversation } from "./scheduled-time";

export const createTaskConversation = async (
  conversation: MyConversation,
  ctx: BotContext,
): Promise<CreateTask> => {
  const locale = await conversation.external(
    () => ctx.session?.__language_code || "en",
  );
  await sendReply(ctx, i18n.t(locale, "startCreateTask"));
  const { title } = await handlerGetTextMessage(conversation);
  await ctx.reply(i18n.t(locale, "enterDescriptionTaskTitle", { title }), {
    parse_mode: "Markdown",
  });
  const msgDescription = await conversation.waitFor("message:text");
  const description = msgDescription.message.text;
  const regularButton = await regularChooseKeyboard((name: string) =>
    i18n.t(locale, name),
  );
  await sendReply(
    ctx,
    i18n.t(locale, "enterRegularTime", {
      title,
      description,
    }),
    regularButton,
  );
  const { messageId, choice: choiceReguular } =
    await handlerGetCallbackQueryMessage(conversation);

  const disposable =
    choiceReguular === "regularButtonChooseAction" ? true : false;
  const { scheduledTimes, idMessage } = await scheduledTimesConversation(
    conversation,
    ctx,
    messageId,
  );

  const newTask = {
    title,
    description,
    disposable,
    scheduledTime: scheduledTimes,
  };
  await conversation.external(async (ctx) => {
    if (ctx?.chat) return;
    // ctx.session.createTaskData = newTask;
    const task = await createTaskService(newTask, ctx.chat?.id ?? 0);
    const schedule = formatTaskSchedule(task);
    const taskCreatedMessage = i18n.t(locale, "createdTask", {
      title: task.title,
      disposable: task.disposable.toString(),
      schedule,
    });

    console.log(ctx.chat?.id ?? 0, idMessage);
    await editMessage(ctx.chat?.id ?? 0, idMessage, taskCreatedMessage);
    // await ctx.reply();
  });
  return newTask;
};
