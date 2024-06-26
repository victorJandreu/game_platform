export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.75,
    },
  },
  exit: {
    opacity: 0,
    transtition: {
        duration: .75
    }
  }
};

export const popUp = {
    hidden: {
        opacity: 0,
        scale: .5
      },
      show: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.75,
        },
      },
      exit: {
        opacity: 0,
        transtition: {
            duration: .75
        }
      }
}