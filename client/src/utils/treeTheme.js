export default {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: 'transparent',
      margin: 0,
      padding: 10,
      color: 'orange',
      fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
      fontSize: '14px',
      border: '1px solid #333',
      borderRadius: 5
    },
    node: {
      base: {
        position: 'relative',
        borderRadius: 5
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '2px 5px',
        display: 'block',
        borderRadius: 1
      },
      activeLink: {
        background: 'rgba(0, 0, 0, 0.05)'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#333',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#333'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
};