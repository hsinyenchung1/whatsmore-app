import React from 'react';
import styles from './Desgin.css';

const Desgin = (props) => (
  <div className={styles.Desgin}>

    {/* <div className={styles.MainTitle}>Designer Cake</div> */}
    <div className={styles.FlavoursOptions}>
      <div className={styles.Title}>Flavours</div>
      <div className={styles.item}>Original chiffon cake + passionfruit chantilly cream</div>
      <div className={styles.item}>Original chiffon cake + strawberry chantilly cream</div>
      <div className={styles.item}>Cocoa chiffon cake + chocolate chantilly cream</div>
      <div className={styles.item}>Matcha chiffon cake + matcha chantilly cream</div>
      <div className={styles.item}>Devil's food cake (chocolate)</div>
    </div>

    <div className={styles.PriceOptions}>
      <div className={styles.Title}> Price </div>
      <div className={styles.item}>4" starts from $68</div>
      <div className={styles.item}>5" starts from $88</div>
      <div className={styles.item}>6" starts from $118</div>
      <div className={styles.item}>8" starts from $168</div>
    </div>

    <div className={styles.Description}>Prices may vary depending on designs contact us for more details.</div>
  </div>
);

export default Desgin;