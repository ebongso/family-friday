'use strict';

(() => {
  const noname = [];
  const onename = ['Happy'];
  const miners = ['Happy', 'Dopey', 'Grumpy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc', 'Snow'];
  const moreminers = ['Happy', 'Dopey', 'Grumpy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc', 'Snow',
                      'Happy', 'Dopey', 'Grumpy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc', 'Snow'];
  const clonedminers = ['Happy', 'Dopey', 'Grumpy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc', 'Snow',
                      'Happy', 'Dopey', 'Grumpy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc', 'Snow',
                      'Happy', 'Dopey', 'Grumpy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc', 'Snow',
                      'Happy', 'Dopey', 'Grumpy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc', 'Snow',
                      'Happy', 'Dopey', 'Grumpy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc', 'Snow'];

  console.assert(group.shuffleNames(noname).length === 0);
  console.assert(group.shuffleNames(onename).length === 1);

  const shuffledMiners = group.shuffleNames(miners);
  console.assert(group.divide(shuffledMiners, [], 0, 0, shuffledMiners.length).length === 2, 'should be 2 groups');
  console.assert(group.divide(moreminers, [], 0, 0, moreminers.length).length === 4, 'should be 4 groups');
  console.assert(group.divide(clonedminers, [], 0, 0, clonedminers.length).length === 8, 'should be 8 groups');
})();