# OptlyReactFeatureTest

1. Login to an [Optimizely Account](https://app.optimizely.com/signin)

2. Create a React Application
```
npx create-react-app optimizely-react-quickstart
cd optimizely-react-quickstart
```

3. Install the SDK
```
yarn add @optimizely/react-sdk
```

4. Instantiate Optimizely in your app 
```
import {
  createInstance,
  OptimizelyProvider,
  useDecision,
  withOptimizely,
} from '@optimizely/react-sdk';

const optimizelyClient = createInstance({ sdkKey:'<Your_SDK_Key>' });
```
5. Create a [feature flag](https://docs.developers.optimizely.com/full-stack/v4.0/docs/react#section-1-create-the-feature-flag) (with variable) in Optimizely


6. Implement the feature in your app:
```
    a. Wrap your app with OptimizelyProvider:
  
  <OptimizelyProvider optimizely={optimizelyClient} user={{ id: 'user12345' }}>
      
      <div className="App">
        <header className="App-header">
        ...
        </header>
      </div>

    </OptimizelyProvider>
  
    b. Evaluate the Feature Flag Component:
    
  // discount Flag
  const DiscountComponent = function() {
    const [decision] = useDecision('discount');
    const isExperiment = decision.ruleKey;
    const enabled = decision.enabled;
    const amount = decision.variables.amount;

    return (
      <div>
        {enabled ? <p>Got a discount of ${amount}</p> : 'You pay full price!'}
      </div>
    )
  };
  ```
  
7. Create an event to track in Optimizely
  ```
    class PurchaseButton extends React.Component {
    onClick = () => {
      const { optimizely } = this.props
      optimizely.onReady().then(() => {
        optimizely.track('purchase')
      })
    }

    render() {
      return (
      <button onClick={this.onClick}>
        Purchase
      </button>
      )
    }
  }

  const WrappedSignupButton = withOptimizely(PurchaseButton);
  ```
  
8. Implement event tracking in your app
```
<DiscountComponent/>
<WrappedSignupButton/>
```

Launch the experiment for your feature!



## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
