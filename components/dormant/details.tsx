export const Details = () => {
    return (
        <>
      <section className="text-start mt-8 w-full">
          <h2 className="text-lg font-semibold mb-2">How to Use</h2>
          <ol className="list-decimal list-inside">
            <li>
              If the &quot;Generated Admin URL&quot; and &quot;Generated Token&quot; fields are empty, click the &quot;Rotate Link&quot; button to generate a new secure link.
            </li>
            <li>
              To access your admin panel:
              <ul className="list-disc list-inside ml-5">
                <li>
                  Click the &#34;Go to Admin Page&#34; button (if URL and token are available).
                </li>
                <li>
                  OR manually copy the generated URL and token into your browser&#39;s address bar, including the `token` parameter.
                </li>
              </ul>
            </li>
            <li>
              Click &#34;Rotate Link&#34; anytime to generate a new secure link and invalidate the old one.
            </li>
          </ol>
        </section>
        </>
    )
}