// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
import React, { useState } from 'react';
import Section from './Section/Section';
import Feedback from './Feedback/Feedback';
import Statistics from './Statistics/Statistics';
import Notification from './NotificationMessage';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const allFeedbacks = countTotalFeedback();
    let result = 0;
    if (allFeedbacks > 0) {
      result = Math.round((good * 100) / allFeedbacks);
    }
    return result;
  };

  const optionFeedbackClick = event => {
    const option = event.target.name;

    switch (option) {
      case 'good':
        setGood(prev => prev + 1);
        break;

      case 'neutral':
        setNeutral(prev => prev + 1);
        break;

      case 'bad':
        setBad(prev => prev + 1);
        break;

      default:
        break;
    }
  };

  const options = ['good', 'neutral', 'bad'];
  const feedbackSum = countTotalFeedback();
  const positiveFeedbacks = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <Feedback
          options={options}
          onLeaveFeedback={optionFeedbackClick}
        ></Feedback>
      </Section>
      <Section title="Statistics">
        {!Boolean(feedbackSum) && <Notification message="There is no feedback" />}
        {Boolean(feedbackSum) && ( 
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={feedbackSum}
            positivePercentage={positiveFeedbacks}
          ></Statistics>
      )}  
      </Section>
    </>
  );
}