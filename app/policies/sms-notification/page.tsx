const SmsNotificationPolicy = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <h1>SMS Notification Opt-In Policy</h1>
      <p>
        Thank you for opting in to receive SMS notifications. By providing your
        phone number and confirming your opt-in, you agree to receive text
        message notifications regarding your appointments. These notifications
        include:
      </p>
      <ul>
        <li>
          <strong>Pending Appointments:</strong> Updates on appointments that
          require your confirmation or action.
        </li>
        <li>
          <strong>Scheduled Appointments:</strong> Reminders about upcoming
          appointments.
        </li>
        <li>
          <strong>Canceled Appointments:</strong> Notifications about
          appointments that have been canceled.
        </li>
      </ul>
      <h2>Important Information:</h2>
      <ul>
        <li>
          <strong>Data Privacy:</strong> Your personal information, including
          your phone number, will be used solely to provide the above
          notifications. We do not sell, share, or use your information for
          marketing purposes.
        </li>
        <li>
          <strong>Message Frequency:</strong> You will only receive messages
          relevant to your appointments.
        </li>
        <li>
          <strong>Standard Messaging Rates:</strong> Standard message and data
          rates may apply as per your mobile carrier&#39;s terms.
        </li>
        <li>
          <strong>Opting Out:</strong> You can opt out at any time by emailing
          anthony.merino@me.com. Upon opting out, you will no longer receive SMS
          notifications from us.
        </li>
      </ul>
      <p>
        By opting in, you acknowledge that you understand and agree to this
        policy. If you have any questions or concerns, please contact{' '}
        <a href='mailto:support@example.com'>anthony.merino@me.com</a>.
      </p>
    </div>
  );
};

export default SmsNotificationPolicy;
