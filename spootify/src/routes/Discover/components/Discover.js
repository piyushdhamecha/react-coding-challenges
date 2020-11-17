import React, { Component } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import makeRequest from '../api'

const APIS = [
  {
    type: 'new-releases',
    responseKey: 'albums',
    stateKey: 'newReleases',
  },
  {
    type: 'featured-playlists',
    responseKey: 'playlists',
    stateKey: 'playlists',
  },
  {
    type: 'categories',
    responseKey: 'categories',
    stateKey: 'categories',
  },
]

export default class Discover extends Component {
  constructor() {
    super()

    this.state = {
      newReleases: {
        isFetching: false,
        data: [],
      },
      playlists: {
        isFetching: false,
        data: [],
      },
      categories: {
        isFetching: false,
        data: [],
      },
    }
  }

  updateState = ({ stateKey, data, isFetching }) => {
    this.setState((prevState) => ({
      ...prevState,
      [stateKey]: {
        data,
        isFetching,
      },
    }))
  }

  callApi = async ({ type, responseKey, stateKey }) => {
    this.updateState({
      stateKey,
      data: [],
      isFetching: true,
    })

    const resp = await makeRequest(type)

    if (!resp) {
      this.updateState({
        stateKey,
        isFetching: false,
      })

      return
    }

    const { data } = resp

    this.updateState({
      stateKey,
      data: data[responseKey].items,
      isFetching: false,
    })
  }

  componentDidMount() {
    APIS.forEach((api) => {
      this.callApi(api)
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          isFetching={newReleases.isFetching}
          data={newReleases.data}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          isFetching={playlists.isFetching}
          data={playlists.data}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories.data}
          isFetching={categories.isFetching}
          imagesKey="icons"
        />
      </div>
    )
  }
}
