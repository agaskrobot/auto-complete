1. What is the difference between Component and PureComponent? give an
example where it might break my app.
    PureComponent re-renders onlu when is needed when Component re-renders every time Parent component re renders or when props were changed.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?
3. Describe 3 ways to pass information from a component to its PARENT.
    a) by callback function passed by props, 
    b) context
    c) Redux
4. Give 2 ways to prevent components from re-rendering.
    a) useCallback
    b) useMemo
5. What is a fragment and why do we need it? Give an example where it might
break my app.
    Is needed because React components allows only one element to be render
    React.Fragment lets wrap multiple elements.
6. Give 3 examples of the HOC pattern.
7. what's the difference in handling exceptions in promises, callbacks and
async...await.
    Promise has state Rejceted for handling errors.
    In async...await catch has to be used for handling exceptions
8. How many arguments does setState take and why is it async.
    Up to 2 arguments, the second is optional. It is async because of performence. 
9. List the steps needed to migrate a Class to Function Component.
    Change class to function, componentmount to useEffect, delete constructor, modify render to return, dont use this, 
10. List a few ways styles can be used with components.
    styledComponent , sass, Tailwind
11. How to render an HTML string coming from the server.
    dangerouslySetInnerHTML

After open [http://localhost:3000](http://localhost:3000) to access the application.