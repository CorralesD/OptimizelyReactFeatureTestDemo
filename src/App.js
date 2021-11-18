import logo from './logo.svg';
import './App.css';
import React from 'react';

import {
  createInstance,
  OptimizelyProvider,
  useDecision,
  withOptimizely,
} from '@optimizely/react-sdk';

const optimizelyClient = createInstance({ sdkKey:'<Your_SDK_Key>' });

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

// Evaluate the flag for discount
const DiscountComponent = function() {
  const [decision] = useDecision('discount');
  const isExperiment = decision.ruleKey;
  const enabled = decision.enabled;
  const amount = decision.variables.amount;

  if (isExperiment) {
console.log(decision);
//console.log(enabled + ': enabled');
console.log('Experiment - ' + decision.ruleKey);
//console.log(decision.flagKey + ': flagkey');
//console.log(decision.userContext.id + ': userContext ID');
//console.log(amount + ': variable amount');
console.log('Variation - ' + decision.variationKey);
  }

  return (
    <div>
      {enabled ? <p>Got a discount of ${amount}</p> : 'You pay full price!'}
    </div>
  )
};

function App() {
  return (
    <OptimizelyProvider optimizely={optimizelyClient} user={{ id: 'user12345' }}>
      
      <div className="App">
        <header className="App-header">
          <DiscountComponent/>
          <WrappedSignupButton/>
        </header>
      </div>

    </OptimizelyProvider>
  );
}

export default App;
