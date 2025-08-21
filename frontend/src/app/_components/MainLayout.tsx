import React from 'react';
import ThemeButton from './ThemeButton';
import Link from 'next/link';

const MainLayout: React.FC = () => {
    return (
        <main>
            <SectionLayout1 />
        </main>
    );
};

export default MainLayout;

function SectionLayout1() {
    return (
        <section>
            {/* 
            Phonic, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif
            font-size: 22px
            font-style normal
            font-weight: 600
            text-align: center
            */}
            <span>HOOD MONTH     +     AUG 19-SEPT 15, 2025</span>
            {/* 
            Martina Plantijn,serif;
            font-size: 72px;
font-style: normal;
font-weight: 400;
letter-spacing: -1px;
line-height: 78px;
text-align: center;
white-space: pre-line;
            */}
            <h1> Money moves, rewards follow</h1>
            {/* 
            css-1k2xshn {
  font-family: Phonic,Helvetica,system-ui,-apple-system,BlinkMacSystemFont,Arial,sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.25px;
  line-height: 24px;
  margin: 0;
  font-style: normal;
}
            */}
            <div>
                <span>HOOD Month is here. Deposit and transfer your way to bonuses and a shot at a solid gold bar.</span>
                {/* .css-1dv345w .body ::after {
  color: white;

  content: "No deposit or Gold membership necessary to enter via mail.\aTerms apply. Subscription may apply.";

  display: block;

  opacity: 0.5;

  position: relative; */}
                <span>No deposit or Gold membership necessary to enter via mail.\aTerms apply. Subscription may apply. </span>
            </div>
            <ThemeButton
                component={Link}
                href='/hood-month'
                variant="primary">
                Explore HOOD Month
            </ThemeButton>

        </section>
    );
}