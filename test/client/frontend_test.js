/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme'; //shallow render

import AllergiesFound from '../../src/components/allergies/AllergiesFound';
import AllergiesList from '../../src/components/allergies/AllergiesList';
import ScannedWords from '../../src/components/allergies/ScannedWords';
import Login from '../../src/components/auth/Login';
import Register from '../../src/components/auth/Register';

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

  it('should render form on Login ', done => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find({ htmlFor: 'email' }).text()).to.equal('Email');
    expect(wrapper.find({ htmlFor: 'password' }).text()).to.equal('Password');
    done();
  });

  it('should render form on Register ', done => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find({ htmlFor: 'username' }).text()).to.equal('Username');
    expect(wrapper.find({ htmlFor: 'email' }).text()).to.equal('Email');
    expect(wrapper.find({ htmlFor: 'password' }).text()).to.equal('Password');
    expect(wrapper.find({ htmlFor: 'passwordConfirmation' }).text()).to.equal('Password Confirmation');
    done();
  });

});
