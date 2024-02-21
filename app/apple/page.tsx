"use client";
import * as React from 'react';
import { Home } from './components/home';

export interface IAppleMusicProps {
}

export default class AppleMusic extends React.Component<IAppleMusicProps> {
  public render() {
    return (
      <div>
        <Home/>
      </div>
    );
  }
}
