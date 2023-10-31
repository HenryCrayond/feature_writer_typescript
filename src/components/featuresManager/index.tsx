import { Box, Button } from '../../atoms';
import { FeatureList, FeatureWriter } from '../../components';
// import { featureListReducer } from '../../store';
import { apply } from 'twind';
import { useEffect, useState, useRef, useReducer, forwardRef } from 'react';

const FeaturesManager = forwardRef((props:any) => {
  const {
    className = '',
    onFeatureListChange = () => {},
    onFeatureDelete = () => {},
    featureList = null,
    rootProps = {},
    allowDownload,
    allowCopy,
    saveButtonProps = {
      text: 'Save Feature',
    },
  } = props;
  const { rootStyle, ...restRootProps } = rootProps;
  const rootTw = apply`grid grid-cols-12 gap(4 lg:6) ${rootStyle}`;

  const rootRef = useRef();

  const [featureListState, dispatch] = useReducer(
    featureListReducer,
    featureList
  );

  const [activeFeature, setActiveFeature] = useState(null);

  const handleAddFeature = () => {
    dispatch({
      type: 'createFeature',
    });
  };
  const handleNameChange = (name, feature) => {
    dispatch({
      type: 'updateFeature',
      payload: {
        ...feature,
        name,
      },
    });
  };

  const handleDeleteFeature = (feature) => {
    dispatch({
      type: 'deleteFeature',
      payload: feature,
    });
    onFeatureDelete(feature);
  };

  useEffect(() => {
    if (!featureList) {
      dispatch({
        type: 'createFeature',
      });
    }
  }, []);

  useEffect(() => {
    // const stateNotChanged = isEqual(featureList, featureListState);
    // if (!stateNotChanged) {
    //   if (onFeatureListChange) {
    //   }
    // }
    if (!activeFeature && featureListState) {
      setActiveFeature(featureListState[0].id);
    }
    if (
      featureListState &&
      activeFeature &&
      !featureListState.find((feature) => feature.id === activeFeature)
    ) {
      setActiveFeature(featureListState[0].id);
    }
    onFeatureListChange(featureListState);
  }, [featureListState]);

  return (
    <Box
      ref={rootRef}
      id="features-manager"
      rootStyle={rootTw}
      className={`FeatureWriter ${className}`}
      {...restRootProps}
    >
      <FeatureList
        featureList={featureListState ?? []}
        onAddFeature={handleAddFeature}
        onDeleteFeature={handleDeleteFeature}
        onFeatureNameChange={handleNameChange}
        allowDownload={allowDownload}
        allowCopy={allowCopy}
        flRootStyle="col-start-1 col-end-13 lg:(col-end-4)"
        setActive={(id) => setActiveFeature(id)}
        activeId={activeFeature}
      />
      <Box rootStyle="col-start-1 lg:(col-start-4) col-end-13">
        {featureListState &&
          featureListState.map(
            (feature) =>
              feature.id === activeFeature && (
                <FeatureWriter
                  key={feature.id}
                  allowCopy={false}
                  onFeatureChange={(featureState) => {
                    dispatch({
                      type: 'updateFeature',
                      payload: featureState,
                    });
                  }}
                  showFeatureName={false}
                  feature={feature}
                  allowDownload={false}
                />
              )
          )}
        <Button
          id="save-feature"
          data-activefeature={activeFeature}
          rootStyle="ml-auto text-capitalize mt-16 mb-8 mr-4 font-medium"
          variant="ghost"
          {...saveButtonProps}
        >
          {saveButtonProps.text}
        </Button>
      </Box>
    </Box>
  );
});

FeaturesManager.displayName = 'FeatureManager';

FeaturesManager.defaultProps = {
  // featureList: [],
  allowDownload: false,
  allowCopy: false,
  saveButtonProps: {
    text: 'Save Feature',
  },
};

export { FeaturesManager };
