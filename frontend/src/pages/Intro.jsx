import { Link } from "react-router-dom";

function Intro() {
  const steps = [
    {
      number: "01",
      title: "Ingest CV",
      description:
        "Upload and process a candidate CV so its content can be prepared for analysis.",
    },
    {
      number: "02",
      title: "Add API Key",
      description:
        "Provide the API key required to power the AI components of the application.",
    },
    {
      number: "03",
      title: "Structure Job",
      description:
        "Enter a job description and transform it into structured requirements.",
    },
    {
      number: "04",
      title: "Match CV",
      description:
        "Compare the candidate's CV with the structured job requirements and evaluate the match.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          AI-Powered CV Matching
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Match the right{" "}
          <span className="text-blue-600">CV</span>
          <br className="hidden sm:block" />
          {" "}with the right job.
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
          A simple AI-powered application for processing candidate CVs,
          structuring job requirements, and evaluating how well a candidate
          matches a specific position.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/ingest-cv"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Get Started
          </Link>

          <a
            href="#how-it-works"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            How it works
          </a>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold text-blue-600">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Four simple steps
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Follow the workflow from CV ingestion to the final matching
            analysis.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                {step.number}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-blue-600 px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to analyze a CV?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100">
            Start by ingesting a candidate CV and follow the workflow to
            generate a job matching analysis.
          </p>

          <Link
            to="/ingest-cv"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Start Matching
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Intro;