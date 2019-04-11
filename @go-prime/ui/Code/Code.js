/**
 * Created by LeutrimNeziri on 01/03/2019.
 */
import React from 'react'
import classNames from 'classnames'
import {PrismAsyncLight as SyntaxHighlighter} from 'react-syntax-highlighter'
import {ghcolors} from 'react-syntax-highlighter/dist/esm/styles/prism'
import withStyles from '@go-prime/ui/withStyles'
const styles = ({palette, size, shadows, transitions, typography}) => ({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignContent: 'flex-start',
    width: '100%'
  },
})

class Code extends React.Component {

  render() {
    const {classes, className: classNameProp, children} = this.props

    const className = classNames(
      classes.root,
      classNameProp
    )

    return (
      <SyntaxHighlighter
        className={className}
        customStyle={{
          width: '100%',
          margin: 0,
          padding: 0,
          lineHeight: 1.7,
          fontSize: 15,
          border: 'none',
          backgroundColor: 'transparent'
        }}
        language="javascript"
        useInlineStyles
        style={ghcolors}>
        {children}
      </SyntaxHighlighter>
    )
  }
}

export default withStyles(styles)(Code)