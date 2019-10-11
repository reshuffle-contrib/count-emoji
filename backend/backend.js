import { update, get } from '@reshuffle/db';

/* @expose */
export async function newEmoji(emoji) {
  const updated = await update(`emojis`, (emojis = []) =>
    emojis.concat([emoji]),
  );
  return updated;
}

/* @expose */
export async function getEmojis() {
  return (await get('emojis')) || [];
}

/* @expose */
export async function emojiCount(emojis) {
  const updated = await update(`emojis`, prevEmojis => emojis);
  return updated;
}
