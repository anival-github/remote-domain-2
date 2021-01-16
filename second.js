window.addEventListener("message", (event) => {
  if (event.origin !== 'http://127.0.0.1:61674') {
    return
  }

  const data = JSON.parse(event.data)
  const { method, key, value } = data;

  if (method === 'put') {
    putData(key, value)
  } else if (method === 'get') {
    readData(key)
  } else if (method === 'delete') {
    removeData(key)
  }
});

const putData = (key, value) => {
  try {
    localStorage.setItem(key, value);

    const obj = JSON.stringify({
      key,
      value,
      method: 'setItem'
    })

    parent.postMessage(obj, 'http://127.0.0.1:61674/task_4/first.html');

  } catch (err) {
    console.log(`something went wrong, there is the following error: ${err}`);
  }
};

const readData = (key) => {
  const value = localStorage.getItem(key);

  if (!value) {
    console.log("there is no such data in domain.two local storage");
    return
  }

  const obj = JSON.stringify({
    key,
    value,
    method: 'getItem'
  })

  parent.postMessage(obj, 'http://127.0.0.1:61674/task_4/first.html');
};

const removeData = (key) => {
  const value = localStorage.getItem(key);

  if (!value) {
    console.log(`There is no such data in the Local Storage with the key "${key}"`);
    return
  }

  const obj = JSON.stringify({
    key,
    value,
    method: 'removeItem'
  })

  try {
    localStorage.removeItem(key);
    parent.postMessage(obj, 'http://127.0.0.1:61674/task_4/first.html');
  } catch (err) {
    console.log(`something went wrong, there is the following error: ${err}`);
  }
};

