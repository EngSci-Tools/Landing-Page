const state = () => ({
  courses: [],
  courseInfo: {
    'CIV102H1 F LEC0101': {
      shortCode: 'CIV102',
      shortName: 'Civil Engineering',
      tools: {
        'HSS Calculator': 'http://hss.engscitools.ca',
        'Truss Solver': 'http://truss.engscitools.ca'
      }
    },
    'ESC101H1 F LEC0101': {
      shortCode: 'ESC101', shortName: 'Praxis I'
    },
    'ESC103H1 F LEC0101': {
      shortCode: 'ESC103', shortName: 'Linear Algebra'
    },
    'ESC194H1 F LEC0101': {
      shortCode: 'ESC194', shortName: 'Calculus I', skuleOverride: 'MAT194'
    },
    'ESC180 F LEC0101': {
      shortCode: 'ESC180', shortName: 'Python'
    },
    'PHY180 F LEC0101': {
      shortCode: 'ESC180', shortName: 'Physics'
    }
  }
})

function processTabs (rawTabs, filter, numAnnouncements, numAssignments) {
  const tabs = {}

  let count = 0
  for (const tab of rawTabs) {
    const { id, label, full_url: url } = tab
    if (filter && filter.indexOf(id) < 0) {
      continue
    }

    let badge = null
    if (id === 'announcements') {
      badge = numAnnouncements || null
    }
    if (id === 'grades') {
      badge = numAssignments || null
    }
    const position = filter ? filter.indexOf(id) : count
    tabs[id] = {
      label, position, url, badge
    }
    count++
  }
  return tabs
}

const getters = {
  basicCourseInfo: (state) => {
    const courses = {}
    if (state.courses == null) {
      return courses
    }
    for (const longCode of Object.keys(state.courseInfo)) {
      const canvasInfo = state.courses.find(course => course.code === longCode)
      if (canvasInfo == null) {
        continue
      }

      const { shortCode, shortName, tools, skuleOverride } = state.courseInfo[longCode]
      const { id, totalStudents, announcements, assignments, teachers, tabs: rawTabs, calendarLink } = canvasInfo

      const dateRange = 3
      const filterDate = new Date()
      filterDate.setDate(filterDate.getDate() - dateRange)
      const announcementsAfterFilter = announcements.filter(a => new Date(a.created) > filterDate)
      const assignmentsAfterFilter = assignments.filter(a => new Date(a.gradedDate) > filterDate)
      const numAnnouncements = announcementsAfterFilter.length
      const numAssignments = assignmentsAfterFilter.length

      const validTabs = ['home', 'modules', 'announcements', 'grades']
      const tabs = processTabs(rawTabs, validTabs, numAnnouncements, numAssignments)

      const skuleCoursesLink = `http://courses.skule.ca/course/${skuleOverride || shortCode}H1`

      courses[id] = {
        id,
        code: shortCode,
        name: shortName,
        tools,
        skuleCoursesLink,
        totalStudents,
        teachers,
        numAnnouncements,
        numAssignments,
        tabs,
        calendarLink
      }
    }
    return courses
  },
  courseDetails: (state) => (courseId) => {
    console.log('Searching for:', courseId)
    if (state.courses == null) {
      return null
    }
    const canvasInfo = state.courses.find(course => course.id === parseInt(courseId))
    if (canvasInfo == null) {
      return null
    }

    const longCode = canvasInfo.code
    const { shortCode, shortName, tools, skuleOverride } = state.courseInfo[longCode]
    const { id, totalStudents, announcements, assignments, teachers, tabs: rawTabs, calendarLink } = canvasInfo

    const numAnnouncements = announcements.length
    const numAssignments = assignments.length

    // const validTabs = ['home', 'modules', 'announcements', 'grades']
    const tabs = processTabs(rawTabs, undefined, numAnnouncements, numAssignments)

    const skuleCoursesLink = `http://courses.skule.ca/course/${skuleOverride || shortCode}H1`

    return {
      id,
      code: shortCode,
      name: shortName,
      tools,
      skuleCoursesLink,
      totalStudents,
      teachers,
      numAnnouncements,
      announcements,
      numAssignments,
      assignments,
      tabs,
      calendarLink
    }
  }
}

const mutations = {
  setCourses (state, courses) {
    state.courses = courses
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
