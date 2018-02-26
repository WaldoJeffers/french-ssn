import parse from "./parse"
import makeSSN from "./makeSSN"

describe("born in France", () => {
  it("returns expected result", () => {
    Date.now = jest.fn(() => new Date("2018"))
    expect(
      parse(
        makeSSN({
          gender: "2",
          month: 4,
          year: 89,
        }),
      ),
    ).toEqual({
      gender: "female",
      birth: {
        year: 1989,
        month: {
          name: "avril",
          index: 4,
        },
        city: {
          insee: "78650",
          name: "LE VESINET",
          postalCode: "78110",
        },
        country: {
          insee: "100",
          name: "France",
        },
        county: {
          insee: "78",
          name: "Yvelines",
        },
      },
    })
  })
})

describe("corner cases", () => {
  it("works with unknown birth month", () => {
    expect(
      parse(
        makeSSN({
          month: 20,
        }),
      ),
    ).toEqual(
      expect.objectContaining({
        birth: expect.objectContaining({
          month: {
            unknown: true,
          },
        }),
      }),
    )
  })
})