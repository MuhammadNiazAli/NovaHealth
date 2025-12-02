import React from 'react';

function UserPrivacyRights() {
  return (
    <section
      aria-labelledby="user-privacy-rights-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20 my-[-30px]"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="user-privacy-rights-heading"
          className="mb-6 text-3xl font-extrabold text-blue-700"
        >
          Your Privacy Rights
        </h2>

        <p className="mb-6 leading-relaxed text-gray-800 text-lg">
          You have important rights regarding your personal data. Depending on where you live, these may include:
        </p>

        <ul className="max-w-xl list-disc list-inside space-y-3 text-gray-800 text-lg">
          <li>
            <strong>Right to Access:</strong> Request a copy of the personal data we hold about you.
          </li>
          <li>
            <strong>Right to Rectification:</strong> Ask us to correct any inaccurate or incomplete data.
          </li>
          <li>
            <strong>Right to Erasure:</strong> Also known as the "right to be forgotten," request deletion of your data under certain circumstances.
          </li>
          <li>
            <strong>Right to Restrict Processing:</strong> Limit how we use your data in specific cases.
          </li>
          <li>
            <strong>Right to Data Portability:</strong> Obtain your data in a structured, commonly used format.
          </li>
          <li>
            <strong>Right to Object:</strong> Object to processing your data for marketing or other purposes.
          </li>
        </ul>

        <p className="mt-6 leading-relaxed text-gray-800 text-lg">
          To exercise any of these rights, please reach out to us via the contact information provided below.
        </p>
      </div>
    </section>
  );
}

export default UserPrivacyRights;
