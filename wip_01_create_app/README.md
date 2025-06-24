## Quick Start

Run the following commands:

```
npm install
NODE_OPTIONS=--openssl-legacy-provider npm start
```

This will install dependencies, then start the app and mock API.

## Starter Project Overview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I made the following enhancements:

1. Added a mock API using [json-server](https://github.com/typicode/json-server). Configured `npm start` to run the app and mock API at the same time using [npm-run-all](https://www.npmjs.com/package/npm-run-all). See [Building Applications with React and Flux](https://app.pluralsight.com/library/courses/react-flux-building-applications/table-of-contents) for details on how to set this up from scratch.
1. Installed [react-router-dom](https://www.npmjs.com/package/react-router-dom), [history](https://www.npmjs.com/package/history) (React Router peer dependency), and [cross-env](https://www.npmjs.com/search?q=cross-env) for declaring environment variables.
1. Added some React components to help us get started: Header, Footer, Spinner
1. Added styles to App.css
1. Added `/public/images`.
1. Added data fetching functions in `/src/services`.
1. Added db.json to root as json-server's mock database
1. Overwrote App.css with custom styles
1. Simplified index.js (removed service worker)
1. Deleted from src: index.css, logo.svg, serviceWorker.js, App.test.js
1. Deleted from public: logo files, manifest.json, robots.txt
1. Customized App.js and renamed to App.jsx


HOOKS
-----
declared top level, not conditional, not nested, root of component... React tracks order


Array destructuring
```
const [size, setSize] = useState("")
```


useefect runs on each render
```
useEffect(() => {
getProducts("shoes").then(data => setProducts(data));
})
```

useEffect - run once (deps empty)
```
useEffect(() => {
getProducts("shoes").then(data => setProducts(data));
}, [])
```


Error boundaries
================
* copy example
https://legacy.reactjs.org/docs/error-boundaries.html
does not catch async - add error state


Promises
========
```jsx
  useEffect(() => {
    getProducts("shoes")
    .then(data => setProducts(data))
    .catch(error => setError(error))
    .finally(() => setLoading(false));
}, [])
```

Async
=====
```jsx
  useEffect(() => {
    (async () => {
        getProducts("shoes")
            .then(data => setProducts(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    })(); //<--- executing async function
}, []);
```


Async await
===========
```jsx
  useEffect(() => {
    async function init() {
        try {
            const response = await getProducts("shoes")
            setProducts(response)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    init()
}, []);

```



Custom hook
===========
```jsx
const { data: products, loading, error } = useFetch(
    "products?category=shoes"
);
```
```data: products  ``` deconstruct and extract data field. alias as product


States
======
use state as local as possible, if necessary, move to a common parent component, or context. or REDUX

Imutability
===========
!!!avoid stopring nested objects in state!!!!!!!!!!!  
!!!avoid costly deep clone - i.e. lodash merge, and it would force redraw !!!!!  
!!! arrays - some methods make clone, some mutate!!!!!
```js
const user = {name: "myname", address:{line1:"address"}}

const shallowCopy = {...user}                            //...user - spread syntax    
const fullCopy = {...user, address: {...user.address}}

const fullCopyWithExtraField = {...user, address: {...user.address}, extra: "extraValue"}

const shallowVersion = Object.assign( {}, user) 
```

memo
====
recallculate only when cart changes
```jsx
    const numItemsInCart = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])
```

forms
=====
handle all changes in one go...  event .target.id reffers to a field id in state object... field in form must have an id!!!
```jsx
function handleChange(e) {
  e.persist();                             //<--------------prevent too early garbage collection
  setAddress((prevState) => {
    return {
      ...prevState,
      [e.target.id]: e.target.value,
    }
  })
}
```

status enum
===========
```jsx
const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
}
```

finite state machine
====================
https://xstate.js.org/


FORMS - COMPONENT
=================
https://formik.org/


REFS
====
* does not trigger re-render  
* store prev  value
* refer to an element, e.t.c

  compare  cpontrolled and uncontrolled elements (with refs)
  [Detail.jsx](src/Detail.jsx)
  and
  [DetailRefs.jsx](src/DetailRefs.jsx)

unmounted components
====================
click between pages quickly (read from api), then move away
```
useFetch.js:16 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    in Products (at App.jsx:63)
```

```jsx
    //declare
    const isMountedRef = useRef(true);

    //check if the component is mounted before  doing any changes
    function init ...
      if (isMountedRef.current) setData(json);
      if (isMountedRef.current) setError(e);
      if (isMountedRef.current) setLoading(false);
    end init

    init();
    return () => isMountedRef.current = false
```


store previous value
====================
```jsx
    //urls are recreated each time!!!!!!!!!!!!!!!!
    const urls = cart.map((i) => `products/${i.id}`);

    //useFetchAll(urls); is called on each redraw, fetch gets a data and redrtaw is required!!!!!!
    const { data: products, loading, error } = useFetchAll(urls);
    
    
```



