
export const UniqueId = (append) => {   // ... nice function to create a unique id ...
  let d = new Date().getTime();
  const uuid = 'xxxx-xxxx-xxxx'.replace(/[xy]/g, (c) => {
      const r = (d + (Math.random() * 16)) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
  return append ? `${uuid}-${append}` : uuid;
};
