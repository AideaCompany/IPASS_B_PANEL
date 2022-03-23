export const generalAnalythics = /* GraphQL */ `
  query generalAnalythics {
    generalAnalythics {
      incumplimientoCheckout
      eventos {
        today
        yesterday
        tomorrow
      }
      eventosExpress {
        today
        yesterday
        tomorrow
      }
      incumplimientos {
        today
        yesterday
        si
      }
    }
  }
`
