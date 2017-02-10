import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Stickies from '../src/components/Stickies';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Stickies components common features', function() {
  const grids = [
    { name: 'Stickies', component: Stickies }
  ];

  grids.forEach(function({ name, component: Stickies }) {

    describe(`<${name} />`, function() {

      it('Renders children', function() {
        const wrapper = shallow(
          <div>
            {}
          </div>
        );

        expect(wrapper).to.have.exactly(2).descendants('.item');
      });

      it('Can change tag name', function() {
        const wrapper = shallow(
          {}
        );

        expect(wrapper).to.have.tagName('ul');
      });

    });

  });
});
