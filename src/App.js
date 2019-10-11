import React from 'react';
import '@reshuffle/code-transform/macro';
import EmojiReact from 'react-emoji-react';

import { getEmojis, emojiCount, newEmoji } from '../backend/backend';

function App() {
  const [emojis, setEmojis] = React.useState([]);

  React.useEffect(() => {
    async function fetchFromDb() {
      let newEmojis = await getEmojis();
      setEmojis([...newEmojis]);
    }
    try {
      fetchFromDb();
    } catch {
      console.error('An error on fetch');
    }
  }, []);

  const onReaction = async name => {
    try {
      let newEmojis = await emojiCount(
        emojis.map(emoji => {
          if (emoji.name === name) {
            emoji.count += 1;
          }
          return emoji;
        }),
      );
      setEmojis([...newEmojis]);
    } catch {
      console.error('An error adding count');
    }
  };

  const onEmojiClick = async name => {
    try {
      let newEmojis = await newEmoji({ name, count: 1 });
      setEmojis([...newEmojis]);
    } catch {
      console.error('An error on adding new emoji');
    }
  };

  return (
    <EmojiReact
      reactions={emojis ? emojis : []}
      onReaction={name => onReaction(name)}
      onEmojiClick={name => onEmojiClick(name)}
    />
  );
}

export default App;
