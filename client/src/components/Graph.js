import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const Graph = ({ itemID }) => {
  return (
    <div id='graphs-container'>
      <div id='graph-header'>
        <div id='stats-name'>
          <h2 id='item-name'>Abyssal Whip</h2>
          <img
            id='item-img'
            src={`https://secure.runescape.com/m=itemdb_oldschool/1625049000357_obj_sprite.gif?id=${itemID}`}
            alt='Item Sprite'
          />
        </div>
        <ul id='graph-btn-ul'>
          <li className='graph-btn-li'>
            <button className='price-btn'>5min</button>
          </li>
          <li className='graph-btn-li'>
            <button className='price-btn'>1hr</button>
          </li>
          <li className='graph-btn-li'>
            <button className='price-btn'>6hrs</button>
          </li>
        </ul>
      </div>
      <canvas id='cart'></canvas>
    </div>
  );
};

export default Graph;
