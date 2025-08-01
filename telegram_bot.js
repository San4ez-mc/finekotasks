const BOT_TOKEN = process.env.BOT_TOKEN;
const API_URL = process.env.API_URL || 'http://localhost';

if (!BOT_TOKEN) {
  console.error('BOT_TOKEN environment variable is required');
  process.exit(1);
}

const baseUrl = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function setCommands() {
  await fetch(`${baseUrl}/setMyCommands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      commands: [
        { command: 'tasks', description: 'List all tasks' },
        { command: 'results', description: 'List all results' }
      ]
    })
  });
}

async function sendMessage(chatId, text, keyboard = null) {
  const payload = { chat_id: chatId, text };
  if (keyboard) {
    payload.reply_markup = keyboard;
  }
  await fetch(`${baseUrl}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

async function answerCallback(id, text = '') {
  await fetch(`${baseUrl}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: id, text })
  });
}

async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

async function getResults() {
  const res = await fetch(`${API_URL}/results`);
  return res.json();
}

async function processUpdate(update) {
  if (update.message) {
    const { chat, text } = update.message;
    if (text === '/tasks') {
      const tasks = await getTasks();
      for (const task of tasks) {
        await sendMessage(chat.id, `Задача: ${task.title}`, {
          inline_keyboard: [[
            { text: 'Завершити', callback_data: `complete_${task.id}` },
            { text: 'Редагувати', callback_data: `edit_${task.id}` }
          ]]
        });
      }
    } else if (text === '/results') {
      const results = await getResults();
      for (const result of results) {
        await sendMessage(chat.id, `Результат: ${result.title}`);
      }
    }
  } else if (update.callback_query) {
    const { id, data, message } = update.callback_query;
    const [action, taskId] = data.split('_');
    if (action === 'complete') {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' })
      });
      await sendMessage(message.chat.id, `Задача ${taskId} завершена`);
    } else if (action === 'edit') {
      await sendMessage(message.chat.id, `Редагування задачі ${taskId} поки не реалізовано.`);
    }
    await answerCallback(id);
  }
}

async function startBot() {
  await setCommands();
  let offset = 0;
  while (true) {
    const res = await fetch(`${baseUrl}/getUpdates?timeout=50&offset=${offset}`);
    const data = await res.json();
    for (const update of data.result) {
      offset = update.update_id + 1;
      await processUpdate(update);
    }
  }
}

module.exports = { startBot };

if (require.main === module) {
  startBot().catch((err) => {
    console.error('Bot error:', err);
  });
}
