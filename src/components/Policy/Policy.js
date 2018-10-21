import React from 'react';
import classes from './Policy.css';

const Policy = (props) => (
  <div className={classes.Policy}>
    <div className={classes.Content}>
      <div className={classes.Title}>
        <div>How it works</div>
        <div>frequently asked questions</div>
      </div>
      <hr />
      <div className={classes.Body}>

        <div className={classes.Section}>
          <div>How do I place an order? </div>
          <div>
            *contact our costumer service to place an order<br />
            *visit our website to fill up a order form<br />
            A confirmation email will sent right after your order placement. please contact our customer service if you do not receive the confirmation email.
          </div>
        </div>
        <div className={classes.Section}>
          <div>What is your location?</div>
          <div>
            400 kata ter, fremont.
          </div>
        </div>

        <div className={classes.Section}>
          <div>how far in advance should i place my order?</div>
          <div>
            in generally, we are fully booked within 7-14 days for customized cakes. we advice placing your order at least 2 weeks ahead of time.
          </div>
        </div>

        <div className={classes.Section}>
          <div>what is your design policy​?</div>
          <div>
            please check our design policy page for more information
          </div>
        </div>

        <div className={classes.Section}>
          <div>what is your business hour?</div>
          <div>
            Tuesday - Sunday 10:30am-6:30pm
          </div>
        </div>

        <div className={classes.Section}>
          <div>what is your frosting made of?</div>
          <div>
            Our frosting is Italian meringue buttercream. This has much lower sugar content than other buttercream( such as American buttercream)
          </div>
        </div>

        <div className={classes.Section}>
          <div>Do you ship your cakes?</div>
          <div>
            No. A cake is fragile. we do not ship out cakes for the completeness cakes.
          </div>
        </div>

        <div className={classes.Section}>
          <div>What is your cancelation policy?</div>
          <div>
          We will return your deposit if you cancel your order 7 days before your pick up date.
          </div>
        </div>

        <div className={classes.Section}>
          <div>Do you do wedding cakes?</div>
          <div>
          Yes, we do. We love making your big day even more glamour. Please contact our customer service to discuss details of your wedding. We do offer the service of setting multiple tiers cake on site, the cost starts from $500.<br />
          For real flower cakes, we need work with a florist to finish the final piece. You have choice of using your own florist or our partnered florist (awaiting the name floral studio). If you use your own florist, we need you provide the amount and the species of flowers at least 7 days before your picking up date, and we require you or your florist deliver the flowers at least 2 hours before your picking up time.
          </div>
        </div>

        <div className={classes.Section}>
          <div>Do you ship your cakes?</div>
          <div>
            No. A cake is fragile. we do not ship out cakes for the completeness cakes.
          </div>
        </div>

        <div className={classes.Section}>
          <div>Do you ship your cakes?</div>
          <div>
            No. A cake is fragile. we do not ship out cakes for the completeness cakes.
          </div>
        </div>
        
      </div>
    </div>
  </div>
);

export default Policy;