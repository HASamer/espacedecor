import Link from "next/link";

export default function Bucket() {
  return (
    <div className=" p-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-center gap-4">
          <div className="sm:flex sm:gap-4">
            <Link
              href="/"
              className="flex rounded-md bg-blue-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Continue Shopping
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4 ml-2 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>

              <div className="mt-8">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <img
                      src="https://i.imgur.com/xReAUxu.jpeg"
                      alt=""
                      className="size-16 rounded-sm object-cover"
                    />

                    <div>
                      <h3 className="text-md text-gray-900 font-semibold">
                        Personalised mini Box
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
                        <div>
                          <dt className="inline">Dimension: </dt>
                          <dd className="inline">6.5 / 4.5 cm</dd>
                        </div>

                        <div>
                          <dt className="inline">Price: </dt>
                          <dd className="inline">25 DT</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only">
                          {" "}
                          Quantity{" "}
                        </label>

                        <input
                          readOnly
                          type="number"
                          min="1"
                          value="1"
                          id="Line1Qty"
                          className="h-8 w-12 rounded-sm border border-gray-200 bg-gray-50 p-0 text-center text-lg text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </form>

                      <button className="text-gray-600 transition hover:text-red-600 border rounded-md border-gray-200 bg-gray-100 p-2 hover:bg-gray-300">
                        <span className="sr-only">Remove item</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>

                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-blue-900">
                      

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>25 DT</dd>
                      </div>
                    </dl>


                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="block rounded-lg border bg-gray-100 px-5 py-2 text-sm text-blue-900 font-semibold transition hover:bg-blue-900 hover:text-white"
                      >
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
