/**
 * Created by LeutrimNeziri on 09/04/2019.
 */
import withStyles from "@material-ui/core/styles/withStyles";
import StructureImage from "assets/images/lecture2/structure.png";
import Divider from "presentations/Divider";
import Typography from "presentations/Typography";
import React, { Fragment } from "react";
import Chart from "presentations/Chart";
import SimpleLink from "presentations/rows/SimpleLink";
import { Normal } from "presentations/Label";

import { 
  randomValuesOfLength,
  randomPositiveValues,
  randomWordsOfLength,
  randomGroupsOfLength
} from 'utils/DataGenerator'
import {number, string} from "prop-types";

const styles = ({ typography, size }) => ({
  root: {},
  graphs: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%'
  },
  card: {
    backgroundColor: 'white',
    width: `calc(32% - ${size.spacing * 2}px)`,
    margin: size.spacing,
    height: 420,
    padding: 8,
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'flex-start'
  },
  graph: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: 'auto'
  }
})

const Card = ({options, title, titleClass, graphClass, ...other}) => {
  return <div {...other}>
    <Typography variant={'title'} className={titleClass}>{title}</Typography>
    <Chart className={graphClass} options={options} />
  </div>
}

const axisGraphDefaultOptions = {
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'value'
  }
}
const GRAPH_TYPES = {
  LINE: 'line',
  SCATTER: 'scatter',
  BAR: 'bar',
  PIE: 'pie',
  TREEMAP: 'treemap'
}
class AssignmentsRecap extends React.Component {

  /**
   * Returns given a length, an array that contains that many elements of the form
   * {
   *  name: 'Random Word',
   *  group: 'Random Group',
   *  value: 'Random Value'
   * }
   * @param {int} length
   * @param {boolean} positive = false
   */
  randomCategoryData (length, positive = false) {
    const values = positive ? randomPositiveValues(length) : randomValuesOfLength(length)
    const words = randomWordsOfLength(length)
    const groups = randomGroupsOfLength(length)
    return words.map((next, index) => { return { name: next, group: groups[index], value: values[index]} })
  }

  /**
   * Function as Line: y = x * 2
   */
  function1 = (props) => {
    const values = randomValuesOfLength(30)
    const options = {
     ...axisGraphDefaultOptions,
      series: [
        {
          data: values.map(x => [x, x * 2]),
          type: GRAPH_TYPES.LINE
        }
      ]
    }
    return <Card options={options} {...props} title={'Function as Line: y = x * 2'} />
  }

  /**
   * Function as Scatter y = square root of the absolute value of ((x ^ 2) + (x * 4))
   */
  function2 = (props) => {
    const values = randomValuesOfLength(30)
    const options = {
     ...axisGraphDefaultOptions,
      series: [
        {
          data: values.map(x => [x, Math.sqrt(Math.abs((x ** 2) + (x * 4)))]),
          type: GRAPH_TYPES.SCATTER
        }
      ]
    }
    const title = 'Function as Scatter y = square root of the absolute value of ((x ^ 2) + (x * 4))'
    return <Card options={options} {...props} title={title} />
  }

  /**
   * Function y = If 3^2 - x^2 > 0 than square root of (3^2 - x^2). If 3^2 - x^2 < 0 then - square root of absolute value of (3^2 - x^2)
   */
  function3 = (props) => {
    const values = randomValuesOfLength(30)
    const options = {
     ...axisGraphDefaultOptions,
      series: [
        {
          data: values.map(x => {
            let y = 3**2 - x ** 2
            return [x, y > 0 ? Math.sqrt(y) : -1 * Math.sqrt(Math.abs(y))]
          }),
          type: GRAPH_TYPES.SCATTER
        }
      ]
    }
    const title = 'Function y = If 3^2 - x^2 > 0 than square root of (3^2 - x^2). If 3^2 - x^2 < 0 then -1 * square root of absolute value of (3^2 - x^2)'
    return <Card options={options} {...props} title={title} />
  }

  /**
   * Function as Line: y = sin(x)
   */
  function4 = (props) => {
    const values = randomValuesOfLength(30)
    const options = {
     ...axisGraphDefaultOptions,
      series: [
        {
          data: values.sort((a, b) => a - b).map(x => [x, Math.sin(x)]),
          type: GRAPH_TYPES.LINE
        }
      ]
    }
    return <Card options={options} {...props} title={'Function as Line: y = sin(x)'} />
  }

  /**
   * Function as Line: y = cos(x)
   */
  function5 = (props) => {
    const values = randomValuesOfLength(30)
    const options = {
     ...axisGraphDefaultOptions,
      series: [
        {
          data: values.sort((a, b) => a - b).map(x => [x, Math.cos(x)]),
          type: GRAPH_TYPES.LINE
        }
      ]
    }
    return <Card options={options} {...props} title={'Function as Line: y = cos(x)'} />
  }

  /**
   * 2 Line Functions displayed together, one for Sin and one for Cos, check only the series option to include two of them
   * Check previous functions
   */
  function6 = (props) => {
    const valuesSin = randomValuesOfLength(30)
    const valuesCos = randomValuesOfLength(30)
    const options = {
     ...axisGraphDefaultOptions,
      series: [
        {
          data: valuesSin.sort((a, b) => a - b).map(x => [x, Math.sin(x)]),
          type: GRAPH_TYPES.LINE
        },
        {
          data: valuesCos.sort((a, b) => a - b).map(x => [x, Math.cos(x)]),
          type: GRAPH_TYPES.LINE
        }
      ]
    }
    const title = '2 Line Functions displayed together, one for Sin and one for Cos, check only the series option to include two of them'
    return <Card options={options} {...props} title={title} />
  }

  /**
   * I want to see the top 4 performing words, given the randomCategoryData, the top 4 with the highest random generated value
   */
  function7 = (props) => {
    const data = this.randomCategoryData(24, true)
    // {
    //   name: 'Agon',
    //   group: 'Lohaj',
    //   value: 23
    // }
    const withoutDuplicates = data.reduce((accumulator, next, index) => {
      const isTheSame = (a, b) => a.name === b.name
      const found = accumulator.find(which => isTheSame(which, next))
      if (found) {
        return accumulator.map(which => {
          if (isTheSame(which, next)) {
            return {...which, value: which.value + next.value }
          }
          return which
        })
      }
      const { name, value } = next
      return [...accumulator, { name, value }]
    }, [])
    // {
    //   name: 'Diqka',
    //   value: 235
    // }
    // console.log('data', data)
    // console.log('withoutDuplicates', withoutDuplicates)
    // console.log('data.sort((a, b) => a.value - b.value)', data.sort((a, b) => a.value - b.value))
    // console.log('Top 4', data.sort((a, b) => b.value - a.value).filter((which, index) => index < 4))
    const options = {
      name: 'Tree',
      series: [
        {
          data: data.sort((a, b) => b.value - a.value).filter((which, index) => index < 4),
          type: GRAPH_TYPES.TREEMAP
        }
      ]
    }
    const title = 'Filter out top 4 most common words, based on their random generated value'
    return <Card options={options} {...props} title={title} />
  }

  /**
   * Calculate the average within the groups now, and show that here. Check the random Category data on how it generates those
   */
  function8 = (props) => {
    const data = this.randomCategoryData(8, true)
    //["Tip", "Group 2", "Group 3"]
    const groups = data.reduce((accumulator, next) => {
      const group = next.group
      return accumulator.includes(group) ? accumulator : [...accumulator, group]
    }, [])
    const grouped = groups.map(group => {
      const items = data.filter(next => next.group === group)
      const length = items.length || Infinity
      const average = items.reduce((sum, next) => sum + next.value, 0) / length
      return {
        name: group,
        value: average.toFixed(2)
      }
    })
    const options = {
      series: [
        {
          data: grouped,
          type: GRAPH_TYPES.PIE
        }
      ]
    }
    return <Card options={options} {...props} title={'The Average within Groups'} />
  }

  /**
   * Calculate the values such that they are cumulative, each subsequent is summed with the total so far!
   */
  function9 = (props) => {
    const data = this.randomCategoryData(8, true)
    const cumulative = data.reduce((accumulator, next) => {
      const { sum, data } = accumulator
      const cumulatedValue = sum + next.value
      return { sum: cumulatedValue, data: [...data, {...next, value: cumulatedValue}]}
    }, { sum: 0, data: [] })
    // {
    //   sum: 300,
    //   data: [{ name: "Agon", value: 4}, { name: "Rrita", value: 10}]
    // }
    const options = {
      xAxis: {
        type: 'category',
        data: data.map(next => next.name)
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: cumulative.data,
          type: GRAPH_TYPES.BAR
        }
      ]
    }
    console.log('test',cumulative.data)
    const title = 'Calculate the values such that they are cumulative, each subsequent is summed with the total so far!'
    return <Card options={options} {...props} title={title} />
  }

  /**
   * I return the index of the searched value within the given values (sorted array of number)
   * @param {Array} values 
   * @param {int} search 
   * @return index - the index of the value
   */
  binarySearch (values, search) {
    // implement 
    const binary = (from, to, values, search) => {
      if (to < from) {
        return -1
      }
      const mid = Math.floor((from + to) / 2)
      if (values[mid] > search) {
        return binary(from, mid - 1, values, search)
      } else if (values[mid] < search) {
        return binary(mid + 1, to, values, search)
      }
      return mid
    } 

    // -1 means I cannot find it. Todo return the index
    return binary(0, values.length - 1, values, search)
  }

  render() {
    const { classes, section } = this.props

    let graphFunctions = section.children[0]
    let binarySearch = section.children[1]

    const cardProps = {
      titleClass: classes.title,
      className: classes.card,
      graphClass: classes.graph
    }

    const values = [1, 4, 12, 16, 22, 24, 28, 44, 70]
    const search = 3
    const index = this.binarySearch(values, search)
    const isCorrect = values.indexOf(search) === index
    return (
      <Fragment>
        <Typography variant={'heading'}>
            Home Assignments Recap
            <Divider />
        </Typography>
        <Typography id={graphFunctions.id} variant={'title'}>
          {graphFunctions.display}
        </Typography>
        <Typography variant='p'>
          Title: "Implements and visualise Mathematical Functions:"<br/>
          Description: "Implement the graph functions according to definition"<br/>
          For more examples on available graphs take a look at: <SimpleLink href="https://ecomfe.github.io/echarts-examples/public/index.html">Echarts Demo</SimpleLink><br/>
          If you want to implement a new chart, then refer to the options: <SimpleLink href="https://ecomfe.github.io/echarts-doc/public/en/option.html">Echarts Graph Options</SimpleLink><br/>
        </Typography>
        <Typography fontStyle={'italic'} variant='p'>
          Tips and Tricks: You are going to use the "Math" function a lot in this assignment, check what the options are!
        </Typography>
        <div className={classes.graphs}>
          {this.function1(cardProps)}
          {this.function2(cardProps)}
          {this.function3(cardProps)}
          {this.function4(cardProps)}
          {this.function5(cardProps)}
          {this.function6(cardProps)}
          {this.function7(cardProps)}
          {this.function8(cardProps)}
          {this.function9(cardProps)}
        </div>

        <Typography id={binarySearch.id} variant={'title'}>
          {binarySearch.display}
        </Typography>
        <Typography variant='p'>
          Title: "Implement the Binary Search Function"<br/>
          Description: "Using Binary Search I will search for the given value at the given sorted array"<br/>
          To understand how binary search works visit: <SimpleLink href="https://www.tutorialspoint.com/data_structures_algorithms/binary_search_algorithm.htm">Binary Search Explenation</SimpleLink><br/>
          
        </Typography>
        <Typography variant='p'>
          For the given values: {values.join(', ')}, return the index of the value {search} which is {values.indexOf(search)} using Binary Search!<br/>
          Currently the solution is: <Normal style={{ color: isCorrect ? 'green' : 'red' }}>{isCorrect ? 'Correct' : 'Not Correct'}</Normal><br/>
          The returned value from the algorithm: {index}
        </Typography>
      </Fragment>
    )
  }
}

export default withStyles(styles)(AssignmentsRecap)
