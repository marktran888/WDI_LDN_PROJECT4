/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme'; //shallow render

import AllergiesFound from '../../src/components/allergies/AllergiesFound';
import AllergiesList from '../../src/components/allergies/AllergiesList';
import ScannedWords from '../../src/components/allergies/ScannedWords';

import Navbar from '../../src/components/Navbar';

describe('Picks tests', () => {

  it('should render Allergies found component ', done => {
    const props = {
      matchWords: ['test']
    };
    const wrapper = shallow(<AllergiesFound data={props} />);
    expect(wrapper.find({ className: 'title' }).text()).to.equal('Allergies found');
    done();
  });

  it('should render Allergies list component ', done => {
    const props = {
      allergies: ['test']
    };
    const wrapper = shallow(<AllergiesList data={props} />);
    expect(wrapper.find({ className: 'title' }).text()).to.equal('Allergies List');
    done();
  });

  it('should render Ingredients found component ', done => {
    const props = {
      scannedWords: ['test']
    };
    const wrapper = shallow(<ScannedWords data={props} />);
    expect(wrapper.find({ className: 'title' }).text()).to.equal('Ingredients found');
    done();
  });
  it('should render navbar component ', done => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find({ className: 'navbar' }).childAt(0).hasClass('navbar-brand')).to.equal(true);
    done();
  });

});
