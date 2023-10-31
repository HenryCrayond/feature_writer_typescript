import { Box, Button, InputEditable } from '../../atoms';
import {
  copyFeature,
  jsonToFeature,
  saveFeatureFile,
} from '../../utils/helperFunctions';
import { apply, tw } from 'twind';
import { useEffect, useState, forwardRef } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { RiAddFill, RiCheckLine } from 'react-icons/ri';
import { TbDownload } from 'react-icons/tb';
import { HiOutlineTrash } from 'react-icons/hi';
import { FeatureListProps } from '../../types';

const FeatureList = forwardRef((props:FeatureListProps) => {
  const {
    className,
    flRootStyle,
    featureList = [],
    onAddFeature = () => {},
    onDeleteFeature = () => {},
    onFeatureNameChange = () => {},
    activeId = null,
    setActive = () => {},
    allowCopy = true,
    allowDownload = true,
    ...rest
  } = props;
  const rootTw = apply`flex flex-col gap-4 ${flRootStyle}`;

  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  }, [copied]);

  useEffect(() => {
    if (downloaded) {
      setTimeout(() => {
        setDownloaded(false);
      }, 500);
    }
  }, [downloaded]);

  return (
    <Box className={`${tw(rootTw)} ${className}`} {...rest}>
      {featureList.length > 0 &&
        featureList.map((feature) => (
          <Box
            key={feature.id}
            rootStyle={`grid grid-cols-12 px-2 min-h([44px]) gap-2 items-center rounded  ${
              activeId === feature.id
                ? 'bg-primary-200'
                : 'bg-white border([1.5px]) border-gray-200'
            }`}
          >
            <Box
              rootStyle="col-start-1 col-end-10 w-full cursor-pointer h-full flex items-center rounded"
              onClick={() => setActive(feature.id)}
            >
              <InputEditable
                textStyle="font-medium"
                onTextEdited={(featureName) =>
                  onFeatureNameChange(featureName, feature)
                }
                text={feature?.name}
              />
            </Box>
            <Box
              rootStyle={`${
                featureList.length > 1
                  ? 'col-start-10 col-end-12'
                  : 'col-start-11 col-end-13'
              }
              flex gap-1 justify-between items-center`}
            >
              {feature?.name && feature?.scenarios?.length > 0 && (
                <>
                  {allowCopy && (
                    <>
                      {copied ? (
                        <RiCheckLine
                          className={tw('text-green(500) w-5 h-5')}
                        />
                      ) : (
                        <MdContentCopy
                          className={tw(
                            'text-primary(500 600(hover:& focus:&)) w-5 h-5 cursor-pointer'
                          )}
                          title="Copy Feature"
                          onClick={() => {
                            const featureFile = jsonToFeature(feature);
                            
                            copyFeature(featureFile);
                            setCopied(true);
                          }}
                        />
                      )}
                    </>
                  )}
                  {allowDownload && (
                    <>
                      {downloaded ? (
                        <RiCheckLine
                          className={tw('text-green(500) w-5 h-5')}
                        />
                      ) : (
                        <TbDownload
                          title="Download Feature"
                          className={tw(
                            'text-primary(500 600(hover:& focus:&)) w-5 h-5 cursor-pointer'
                          )}
                          onClick={() => {
                            const featureFile = jsonToFeature(feature);
                            saveFeatureFile(featureFile, feature?.name);
                            setDownloaded(true);
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
            {featureList.length > 1 && (
              <Box rootStyle="col-start-12 col-end-13">
                <HiOutlineTrash
                  onClick={() => onDeleteFeature(feature)}
                  className={tw(
                    `text-red(300 500(hover:& focus:&)) w-5 h-5 cursor-pointer`
                  )}
                />
              </Box>
            )}
          </Box>
        ))}
      <Button
        rootStyle="w-max font-medium"
        leftIcon={<RiAddFill className={tw(`w-4 h-4`)} />}
        onClick={onAddFeature}
        size="sm"
        variant="ghost"
      >
        Add Feature
      </Button>
    </Box>
  );
});

FeatureList.displayName = 'FeatureList';

FeatureList.defaultProps = {
  allowCopy: true,
  allowDownload: true,
  featureList: [],
};

export { FeatureList };
